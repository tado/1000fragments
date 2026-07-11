uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.96 + sr * 23.80 - t * 0.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.35));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
