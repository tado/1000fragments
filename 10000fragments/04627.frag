uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.27 + sr * 15.23 - t * 4.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.63;
	p += vec2(0.82, 0.41) * sin(length(p) * 3.41 - time * 1.51) * 0.32;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.44 * p.y + time * 0.79); p.y += 0.26 / wf * cos(wf * 3.59 * p.x + time * 1.74); }
	p = rot2(p.y * -3.48 + time * 0.68) * p;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.60));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
