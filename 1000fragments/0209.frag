uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.58 + sr * 19.09 - t * 1.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	p += vec2(0.47, 0.98) * sin(length(p) * 4.09 - time * 0.82) * 0.25;
	p = abs(p) - 0.41;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.71), field(p, time, 1.42));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
