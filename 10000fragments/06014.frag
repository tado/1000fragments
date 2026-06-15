uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.25 * cos(sa * 4 + t * 1.44 + ph);
    v = sin((sr - petal) * 12.81);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.08;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.48), field(p, time, 0.97));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
