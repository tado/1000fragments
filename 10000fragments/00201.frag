uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.00 + t * 1.37 + ph) + sin(p.y * 16.11 - t * 4.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -2.25 + time * 0.31) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.98, 0.80, 0.87) + vec3(0.28, 0.29, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
