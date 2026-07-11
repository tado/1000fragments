uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.68 + sr * 12.67 - t * 3.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	p = abs(p) - 0.43;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.38), field(p, time, 0.75));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
