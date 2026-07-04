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
        vec2 im = vec2(sin(t * 0.78 + jf * 4.0), cos(t * 0.29 * jf)) * 0.81;
        xs += sin(length(p - im) * 93.81 - t * 6.97 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.55) * p * 12.63;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 0.98 + time * 0.18, vec3(0.53, 0.48, 0.55), vec3(0.38, 0.49, 0.45), vec3(0.82, 1.36, 1.11), vec3(0.94, 0.48, 0.83)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
