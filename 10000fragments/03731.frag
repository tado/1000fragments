uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.09, t * 1.20 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.68) * p;
	p *= 3.35;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.19; p = rot2(1.85) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.14, vec3(0.57, 0.48, 0.50), vec3(0.37, 0.40, 0.41), vec3(1.15, 1.33, 0.74), vec3(0.45, 0.47, 0.04));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
