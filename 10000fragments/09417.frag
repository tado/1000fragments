uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.73 + t * 4.98 + ph) + sin(p.y * 4.82 - t * 3.41 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.35 + jf * 4.0), cos(t * 0.14 * jf)) * 0.95;
        xs += sin(length(p - im) * 134.20 - t * 4.87 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 2.00);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.69 + time * 0.08, vec3(0.50, 0.53, 0.60), vec3(0.32, 0.44, 0.31), vec3(0.79, 1.34, 1.29), vec3(0.88, 0.75, 0.30));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
