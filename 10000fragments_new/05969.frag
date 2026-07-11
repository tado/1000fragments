uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.77 + vec2(t * 2.18, -t * 1.09) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.19) * p;
	p = fract(p * 2.01) - 0.5;
	p = (floor(p * 21.6) + 0.5) / 21.6;
	p += vec2(0.54, 0.21) * sin(length(p) * 2.12 - time * 1.73) * 0.33;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.87 + time * 0.13);
	col = mod(col * 1.68, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
