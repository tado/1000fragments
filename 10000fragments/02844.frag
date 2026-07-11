uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.11 + vec2(t * 1.59, -t * 1.59) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.51; p = rot2(1.96) * p; }
	p = abs(p) - 0.36;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.17 + time * 0.16);
	col = fract(col * 2.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
