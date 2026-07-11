uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.93 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.55 + t * 3.73 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.03);
    float gsh = hash21(vec2(grow, floor(t * 3.36))) - 0.5;
    float gx = p.x + gsh * 0.45;
    v = sin(gx * 6.53 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.57));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.05;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.57);
	float d = d1 * d2;
	vec3 col = palette(d * 0.82 + time * 0.14, vec3(0.46, 0.52, 0.54), vec3(0.43, 0.34, 0.34), vec3(0.97, 1.09, 0.99), vec3(0.64, 0.80, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
