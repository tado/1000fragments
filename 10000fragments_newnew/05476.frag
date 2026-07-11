uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.74 - t * 1.11;
    v = sin(floor(lv * 4.0) / 4.0 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.57;
	p *= 1.26;
	p = rot2(time * -0.98) * p;
	p = (floor(p * 9.6) + 0.5) / 9.6;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.85));
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.08, 0.35, 0.53), vec3(0.69, 0.63, 0.67), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
