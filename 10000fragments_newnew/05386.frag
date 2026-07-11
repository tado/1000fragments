uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.56 - t * 1.57;
    v = sin(floor(lv * 2.2) / 2.2 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -2.30 + time * 0.34) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.64 + time * 0.00);
	col *= 0.82 + 0.18 * sin(gl_FragCoord.y * 2.66 + time * 5.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
