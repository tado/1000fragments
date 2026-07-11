uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.74, t * 1.31 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	p = fract(p * 2.68) - 0.5;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.22; p = rot2(0.39) * p; }
	p = rot2(time * 1.14) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.18, 0.01), vec3(0.83, 0.50, 0.45), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
