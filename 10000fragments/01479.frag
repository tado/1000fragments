uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.91 + sr * 11.76 - t * 3.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.59;
	p = fract(p * 1.71) - 0.5;
	p += vec2(0.41, 0.69) * sin(length(p) * 3.82 - time * 1.04) * 0.13;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.03));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
