uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.23 * cos(sa * 8 + t * 1.55 + ph);
    v = sin((sr - petal) * 7.53);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.23, 1.05, 0.64) + vec3(0.15, 0.03, 0.11);
	col = mod(col * 1.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
