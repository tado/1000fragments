uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.63 + t * 4.36 + ph) + sin(p.y * 16.65 - t * 3.02 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.19 + jf * 4.0), cos(t * 0.26 * jf)) * 0.81;
        xs += sin(length(p - im) * 85.01 - t * 11.45 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.54 + time * 0.04, vec3(0.44, 0.44, 0.52), vec3(0.42, 0.48, 0.31), vec3(0.76, 0.94, 1.37), vec3(0.01, 0.90, 0.78));
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
