uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.17 * cos(sa * 9 + t * 0.59 + ph);
    v = sin((sr - petal) * 8.66);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.82;
	p += vec2(-0.29, 0.43) * sin(length(p) * 5.26 - time * 1.83) * 0.23;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.42), field(p, time, 0.85));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.46, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
