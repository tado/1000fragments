uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.05 + sin(p.y * 5.13 + t * 3.16) * 2.25 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.62 + jf * 4.0), cos(t * 0.31 * jf)) * 0.72;
        xs += sin(length(p - im) * 116.63 - t * 12.43 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.89);
	float d = d1 + d2;
	vec3 col = palette(d * 1.57 + time * 0.16, vec3(0.55, 0.47, 0.48), vec3(0.36, 0.32, 0.33), vec3(1.05, 0.72, 0.88), vec3(0.59, 0.80, 0.72));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
