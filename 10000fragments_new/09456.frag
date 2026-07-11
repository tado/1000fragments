uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.51 - t * 1.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 1.68, length(p) * 4.49 - time * 0.38); }
	p = rot2(time * 1.41) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.05, 0.33, 0.54), vec3(0.91, 0.72, 0.94), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
