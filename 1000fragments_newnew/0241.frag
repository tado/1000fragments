uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.74 + jf * 4.0), cos(t * 0.53 * jf)) * 0.42;
        xs += sin(length(p - im) * 187.51 - t * 4.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.59;
	float d = 0.5 + 0.5 * field(p, (time * 0.58), 0.0);
	vec2 hq = rot2(0.38) * p * 8.08;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.64;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 0.89 + (time * 0.58) * 0.03, vec3(0.48, 0.45, 0.36), vec3(0.26, 0.29, 0.33), vec3(0.72, 0.70, 0.83), vec3(0.21, 0.78, 0.36)) * v;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.060, 0.977, 0.930) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
