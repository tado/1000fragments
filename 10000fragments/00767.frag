uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.48 - t * 7.60 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.65 + jf * 4.0), cos(t * 0.53 * jf)) * 0.54;
        xs += sin(length(p - im) * 196.06 - t * 4.28 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.76;
	p += vec2(-0.28, 0.48) * sin(length(p) * 3.73 - time * 0.68) * 0.27;
	p = rot2(p.y * 1.53 + time * 0.21) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.43);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.29 + time * 0.02, vec3(0.46, 0.51, 0.51), vec3(0.35, 0.46, 0.39), vec3(1.32, 1.34, 0.88), vec3(0.93, 0.11, 0.52));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
