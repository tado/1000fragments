uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 11.37 - t * 7.15 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 37.22 - t * 7.15 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	p = rot2(p.y * 1.15 + time * 0.97) * p;
	p = abs(p);
	p = rot2(length(p) * 3.62 + time * 0.99) * p;
	p = rot2(time * 0.52) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.57, 0.77, 1.43) + vec3(0.29, 0.26, 0.14);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
