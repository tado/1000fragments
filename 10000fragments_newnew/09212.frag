uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.40 + 0.35 * pow(abs(cos(ra * 4.0 + t * 0.76)), 2.30);
    v = sin((rr - pet) * 19.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.19) - 0.5;
	p *= 1.0 + 0.12 * sin(time * 1.78);
	{ p = vec2(atan(p.y, p.x) * 1.36, length(p) * 3.32 - time * 0.49); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.57 + time * 0.28);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
