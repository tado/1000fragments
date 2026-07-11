uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 6.01 - t * 5.50 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.20; p = rot2(1.18) * p; }
	p = abs(p);
	p = rot2(2.21) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.25, vec3(0.43, 0.51, 0.40), vec3(0.44, 0.39, 0.42), vec3(1.05, 1.21, 0.97), vec3(0.54, 0.06, 0.75));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
