uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.26 * cos(sa * 6.0 + t * 1.96 + ph);
    v = sin((sr - petal) * 11.95);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.15;
	p *= 2.04;
	p += vec2(0.37, -0.31) * sin(length(p) * 4.47 - time * 1.79) * 0.30;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.79, 0.58, 0.97) * (0.08 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.90 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
