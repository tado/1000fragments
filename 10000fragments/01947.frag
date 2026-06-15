uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.25 + t * 4.48 + ph) + sin(p.y * 15.69 - t * 5.92 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	p = rot2(length(p) * -3.06 + time * 1.14) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.30, 0.19, 0.10), vec3(0.98, 0.71, 0.68), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
