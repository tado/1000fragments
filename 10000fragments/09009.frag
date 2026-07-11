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
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.95 + jf * 4.0), cos(t * 0.18 * jf)) * 0.36;
        xs += sin(length(p - im) * 123.01 - t * 7.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.22; p = rot2(1.38) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.71 + time * 0.18, vec3(0.54, 0.57, 0.57), vec3(0.46, 0.30, 0.33), vec3(0.93, 1.20, 0.74), vec3(0.36, 0.75, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
