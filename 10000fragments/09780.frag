uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.46 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.43 + t * 1.49 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.16 + t * 1.38) - 0.5) * 2.0;
    v = sin((p.y * 7.03 + zx * 0.69 + t * 2.76) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	p = abs(p) - 0.45;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.68; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = d1 + d2;
	vec3 col = palette(d * 0.53 + time * 0.03, vec3(0.57, 0.56, 0.54), vec3(0.38, 0.32, 0.34), vec3(1.24, 1.18, 0.92), vec3(0.44, 0.68, 0.83));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
