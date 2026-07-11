uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.25 * cos(sa * 3 + t * 0.39 + ph);
    v = sin((sr - petal) * 16.94);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.09;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.94), field(p, time, 1.87));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
