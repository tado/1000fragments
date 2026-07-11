uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.83 + sr * 15.81 - t * 1.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.97;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.85), field(p, time, 1.70));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
