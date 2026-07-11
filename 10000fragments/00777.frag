uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.89 + sin(p.y * 3.90 + t * 4.74) * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	p = rot2(time * 0.39) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.35 + time * 0.05);
	col = mod(col * 2.10, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
