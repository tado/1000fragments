uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.31 - t * 4.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.24; p = rot2(1.70) * p; }
	p = rot2(p.y * 2.73 + time * 0.49) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.23, 0.42), vec3(0.93, 0.96, 0.62), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
