uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.91 + jf * 4.0), cos(t * 0.51 * jf)) * 0.84;
        xs += sin(length(p - im) * 106.96 - t * 10.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.70;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.18; p = rot2(0.42) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.21, vec3(0.53, 0.59, 0.48), vec3(0.30, 0.43, 0.39), vec3(0.87, 1.24, 0.78), vec3(0.73, 0.98, 0.39));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
