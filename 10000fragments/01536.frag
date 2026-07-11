uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.15 - t * 6.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	p = rot2(p.y * -2.87 + time * 0.25) * p;
	p += vec2(-0.38, 0.13) * sin(length(p) * 2.25 - time * 1.78) * 0.12;
	p = abs(p) - 0.26;
	p = rot2(time * 0.58) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.97 + time * 0.09);
	col = fract(col * 2.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
