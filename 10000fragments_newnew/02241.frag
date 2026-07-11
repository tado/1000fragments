uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.29 * cos(sa * 5.0 + t * 1.86 + ph);
    v = sin((sr - petal) * 13.38);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.65));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
