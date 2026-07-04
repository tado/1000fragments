uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.40 + jf * 4.0), cos(t * 0.17 * jf)) * 0.69;
        xs += sin(length(p - im) * 122.41 - t * 11.63 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.37) * p * 13.48;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = mix(vec3(0.84, 0.93, 0.94), vec3(0.11, 0.14, 0.16), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
