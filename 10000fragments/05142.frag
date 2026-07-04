uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.16 + jf * 4.0), cos(t * 0.59 * jf)) * 0.44;
        xs += sin(length(p - im) * 188.40 - t * 8.21 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.46 - t * 1.02;
    v = sin(floor(lv * 4.1) / 4.1 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	p *= 2.35;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.81);
	float d = d1 + d2;
	vec3 col = palette(d * 1.65 + time * 0.09, vec3(0.42, 0.52, 0.56), vec3(0.41, 0.31, 0.36), vec3(0.96, 0.79, 1.36), vec3(0.55, 0.68, 0.86));
	col = mod(col * 1.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
