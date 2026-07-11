uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.39 + vec2(t * 0.84, -t * 0.84) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.57; p = rot2(1.89) * p; }
	p = rot2(length(p) * -2.56 + time * 1.17) * p;
	p += vec2(-0.93, 0.71) * sin(length(p) * 2.55 - time * 1.99) * 0.13;
	p = rot2(p.y * 1.15 + time * 1.00) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.40 + time * 0.01);
	col = mod(col * 1.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
