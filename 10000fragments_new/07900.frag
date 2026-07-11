uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.96);
    float gsh = hash21(vec2(grow, floor(t * 3.21))) - 0.5;
    float gx = p.x + gsh * 0.95;
    v = sin(gx * 7.65 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.18));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.10, lr * 1.06 + time * 0.91); }
	{ p = vec2(atan(p.y, p.x) * 2.54, length(p) * 4.31 - time * 0.51); }
	p *= 2.63;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.29; p = rot2(0.93) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.09, 0.34), vec3(0.71, 0.84, 0.52), d);
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
