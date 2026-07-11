uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.62 + t * 0.79 + ph) * 0.7;
    float wb = sin(p.y * 11.58 - t * 2.17 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.49;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.08;
	{ p = vec2(atan(p.y, p.x) * 2.41, length(p) * 4.90 - time * 0.47); }
	p = rot2(1.27) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.16, 0.56, 1.26) + vec3(0.08, 0.18, 0.28);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
