uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.93, t * 1.77 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	p += vec2(0.47, 0.90) * sin(length(p) * 3.89 - time * 1.86) * 0.23;
	p = rot2(length(p) * 2.71 + time * 0.45) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.91 + time * 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
