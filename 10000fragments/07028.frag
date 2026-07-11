uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.91, t * 0.80 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.45; p = rot2(0.74) * p; }
	p += vec2(-0.11, 0.03) * sin(length(p) * 2.49 - time * 1.63) * 0.15;
	p = rot2(length(p) * -2.14 + time * 1.07) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.03, 0.26), vec3(0.86, 0.73, 0.58), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
