uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.57 + sr * 22.93 - t * 4.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.89, 0.81) * sin(length(p) * 4.18 - time * 1.70) * 0.35;
	p = fract(p * 1.74) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.80), field(p, time, 1.59));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
