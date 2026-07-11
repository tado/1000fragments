uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.33 * pow(abs(cos(ra * 6.0 + t * 2.22)), 2.74);
    v = sin((rr - pet) * 12.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.63) * p;
	p = abs(p) - 0.56;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.64 + time * 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
