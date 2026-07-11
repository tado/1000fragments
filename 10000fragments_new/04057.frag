uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.95);
    float gsh = hash21(vec2(grow, floor(t * 7.46))) - 0.5;
    float gx = p.x + gsh * 0.39;
    v = sin(gx * 10.73 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.15));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	p = (floor(p * 27.6) + 0.5) / 27.6;
	p = rot2(time * -1.03) * p;
	p = rot2(2.57) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.20, lr * 2.26 + time * 0.59); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.01, 0.15), vec3(0.95, 0.86, 0.62), d);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
