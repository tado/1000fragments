uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.23 * cos(sa * 4 + t * 0.95 + ph);
    v = sin((sr - petal) * 12.18);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.69, 1.27, 1.10) + vec3(0.04, 0.11, 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
