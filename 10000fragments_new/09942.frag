uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.87, t * 1.09 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	p = (floor(p * 6.7) + 0.5) / 6.7;
	p = rot2(3.06) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.46; p = rot2(1.97) * p; }
	p += vec2(-0.37, -0.46) * sin(length(p) * 3.34 - time * 0.97) * 0.32;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.05 + time * 0.02, vec3(0.46, 0.46, 0.56), vec3(0.45, 0.31, 0.34), vec3(0.89, 1.26, 1.14), vec3(0.54, 0.74, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
