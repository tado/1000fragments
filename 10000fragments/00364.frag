uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.52 + t * 4.06 + ph) + sin(p.y * 7.29 - t * 1.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	p = rot2(time * 0.27) * p;
	p += vec2(0.56, -0.70) * sin(length(p) * 4.85 - time * 1.10) * 0.16;
	{ p = vec2(atan(p.y, p.x) * 1.16, length(p) * 3.63 - time * 0.59); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.07, 0.20, 0.05), vec3(0.91, 0.93, 0.95), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
