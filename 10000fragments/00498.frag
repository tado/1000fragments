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
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.32 + jf * 4.0), cos(t * 0.18 * jf)) * 0.53;
        xs += sin(length(p - im) * 75.05 - t * 9.01 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.61;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.22) * p * 17.66;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.51;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.18 + time * 0.07, vec3(0.60, 0.57, 0.44), vec3(0.47, 0.30, 0.31), vec3(0.79, 0.87, 1.33), vec3(0.54, 0.26, 0.27)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(2.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
