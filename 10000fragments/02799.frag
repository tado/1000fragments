uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.79 + vec2(t * 2.07, -t * 2.07) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	p *= 3.50;
	p = rot2(p.y * -3.33 + time * 0.49) * p;
	p = abs(p) - 0.40;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.41; p = rot2(2.33) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.91 + time * 0.27, vec3(0.55, 0.55, 0.57), vec3(0.50, 0.49, 0.49), vec3(1.38, 0.81, 0.92), vec3(0.89, 0.33, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
