uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.20 * cos(sa * 6.0 + t * 2.61 + ph);
    v = sin((sr - petal) * 10.40);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.y += sin(p.x * 5.55 + time * 2.36) * 0.32;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.50));
	col = 0.5 + 0.5 * col;
	col *= 0.84 + 0.14 * sin(gl_FragCoord.y * 2.92 + time * 9.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
