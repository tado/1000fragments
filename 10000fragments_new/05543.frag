uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.25 * cos(sa * 4.0 + t * 1.20 + ph);
    v = sin((sr - petal) * 10.68);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.82;
	p = rot2(p.y * -2.83 + time * 1.15) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.45, 0.92, 0.25) * (0.06 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
